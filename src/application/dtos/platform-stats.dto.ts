// src/application/dtos/platform-stats.dto.ts
import { Type, Static } from '@sinclair/typebox';

export const PlatformStatsResponseSchema = Type.Object({
  totalStudents: Type.Number(),
  totalUniversities: Type.Number(),
  totalTutors: Type.Number(),
  activeSubscriptions: Type.Number(),
  recentRegistrations: Type.Array(
    Type.Object({
      userId: Type.String(),
      userType: Type.String(),
      createdAt: Type.String({ format: 'date-time' }),
    }),
  ),
  subscriptionDistribution: Type.Object({
    LOW: Type.Number(),
    MEDIUM: Type.Number(),
    HIGH: Type.Number(),
  }),
});

export type PlatformStatsResponseDto = Static<
  typeof PlatformStatsResponseSchema
>;
