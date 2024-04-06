export interface PagesMeta {
    PageCount: number
}

export interface Entity {
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PaginationConfig {
    currentPage: number;
    totalPages: number;
    allowExport?: boolean;
}

export interface PageFilter {
    page: number;
    perPage: number;
    sortBy?: string;
    sortDirection?: string;
    
    // used to reload stuff
    reload?: string;
}

export interface StatusFilter {
	showNew?: boolean;
	showPending?: boolean;
	showInProgress?: boolean;
	showCancelled?: boolean;
	showCompleted?: boolean;
}

export interface AdditionalActionsConfig {
	title?: string;
	link?: string;
	callback?: <T>(item: T) => void;
	eventName?: string;
	showIf?: <T>(item: T) => boolean;
}

export interface RadioButtonInput {
	value?: string | number;
	display?: string;
}

export enum status {
	new = "new",
	pending = "pending",
	inProgress = "in-progress",
	completed = "completed",
	cancelled = "cancelled"
}