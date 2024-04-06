import  type { AdditionalActionsConfig } from './types'
import  type { MomentInput } from 'moment'
import moment from 'moment'

export interface TableRow {
	colspan: number,
	title: string,
	value: string | number,
	class: string
	editable?: boolean
	readonly onChangeFunc?: () => (newValue: number | string | undefined) => void
}

export interface SelectOption {
	key?: string,
	title?: string,
	subtitle?: string,
}

export interface SelectFormatter<T> {
	slug(): string
	toSelectOption(item: T): SelectOption,
	resetPin(): void
	setPin(item: T): void,
	getPin(): T
}

export interface TableFormatter<T> {
	hello(): string
	columns(item: T): TableRow[],
	additionalActions(item: T): AdditionalActionsConfig[]
}

export const formatDate = function (input: Date | string | undefined, format: string = 'DD/MM/YYYY'): string {
	return moment(input as MomentInput).format(format)
}

export const toISOFormatDate = function(input: Date | string | undefined): string {
	if (!input) {
		return ""
	}

	return moment(input as MomentInput).toISOString()
}