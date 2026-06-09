import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { Budget, BudgetDocument } from './schemas/budget.schema';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { RecordSpendDto } from './dto/record-spend.dto';

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

@Injectable()
export class BudgetsService {
  constructor(
    @InjectModel(Budget.name)
    private readonly budgetModel: Model<BudgetDocument>,
  ) {}

  create(owner: string, dto: CreateBudgetDto): Promise<BudgetDocument> {
    return this.budgetModel.create({
      ...dto,
      period: dto.period ?? 'monthly',
      autoRenew: dto.autoRenew ?? true,
      alertThreshold: dto.alertThreshold ?? 80,
      assignedTo: dto.assignedTo ?? [],
      periodStart: dto.periodStart ? new Date(dto.periodStart) : undefined,
      periodEnd: dto.periodEnd ? new Date(dto.periodEnd) : undefined,
      owner: new Types.ObjectId(owner),
      spent: 0,
      entries: [],
    });
  }

  findAll(owner: string, category?: string): Promise<BudgetDocument[]> {
    const filter: FilterQuery<BudgetDocument> = {
      owner: new Types.ObjectId(owner),
    };
    if (category) filter.category = category;
    return this.budgetModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  async findOne(owner: string, id: string): Promise<BudgetDocument> {
    const budget = await this.budgetModel
      .findOne({ _id: id, owner: new Types.ObjectId(owner) })
      .exec();
    if (!budget) throw new NotFoundException('Budget not found');
    return budget;
  }

  async update(
    owner: string,
    id: string,
    dto: UpdateBudgetDto,
  ): Promise<BudgetDocument> {
    const budget = await this.findOne(owner, id);
    const { periodStart, periodEnd, ...rest } = dto;
    Object.assign(budget, rest);
    if (periodStart !== undefined)
      budget.periodStart = periodStart ? new Date(periodStart) : undefined;
    if (periodEnd !== undefined)
      budget.periodEnd = periodEnd ? new Date(periodEnd) : undefined;
    return budget.save();
  }

  async recordSpend(
    owner: string,
    id: string,
    dto: RecordSpendDto,
  ): Promise<BudgetDocument> {
    const budget = await this.findOne(owner, id);
    budget.entries.push({
      amount: dto.amount,
      label: dto.label,
      spentAt: dto.spentAt ? new Date(dto.spentAt) : new Date(),
    });
    budget.spent = round2(budget.spent + dto.amount);
    return budget.save();
  }

  // Starts a fresh cycle: archive spend back to zero (used by auto-renew).
  async reset(owner: string, id: string): Promise<BudgetDocument> {
    const budget = await this.findOne(owner, id);
    budget.spent = 0;
    budget.entries = [];
    return budget.save();
  }

  async remove(owner: string, id: string): Promise<void> {
    const res = await this.budgetModel
      .deleteOne({ _id: id, owner: new Types.ObjectId(owner) })
      .exec();
    if (res.deletedCount === 0) throw new NotFoundException('Budget not found');
  }

  async summary(owner: string) {
    const budgets = await this.findAll(owner);
    let totalAllocated = 0;
    let totalSpent = 0;
    let exceeded = 0;
    let needsAttention = 0;

    for (const b of budgets) {
      totalAllocated = round2(totalAllocated + b.amount);
      totalSpent = round2(totalSpent + b.spent);
      const pct = b.amount > 0 ? (b.spent / b.amount) * 100 : 0;
      if (b.spent > b.amount) exceeded += 1;
      else if (pct >= b.alertThreshold) needsAttention += 1;
    }

    return {
      count: budgets.length,
      totalAllocated,
      totalSpent,
      remaining: round2(Math.max(0, totalAllocated - totalSpent)),
      exceeded,
      needsAttention,
    };
  }
}
