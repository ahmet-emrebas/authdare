import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

export type ApiPropertyOptionsExtention = {
  id: string;
  groupName: string;
  groupOrder: number;
  autocomplete: string;
  autocompleteList: string[];
  twoFactorConfirm: boolean;
  isPhone: string;
  isEmail: string;
  lessThan: number | Date;
  moreThan: number | Date;
  lessThanOrEqualTo: number | Date;
  moreThanOrEqualTo: number | Date;
  lessThanMsg: string;
  moreThanMsg: string;
  lessThanOrEqualToMsg: string;
  moreThanOrEqualToMsg: string;
  isInRange: [number, number];
  isInRangeMsg: string;
  isRequired: string;
  minLengthMsg: string;
  maxLengthMsg: string;
  dependent: string[];
  isEqualTo: string;
  isEqualToMsg: string;
  unique: boolean;
  countPath: string;
};

export function ApiPropertyOptionsMore(
  options: Partial<ApiPropertyOptions & ApiPropertyOptionsExtention>,
) {
  return ApiProperty(options);
}
