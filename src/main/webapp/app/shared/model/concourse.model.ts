export interface IConcourse {
    name?: string;
    pseudoId?: number;
    _links?: {
        self?: {
            href?: string;
        }
    };
    isSelected?: boolean;
}
