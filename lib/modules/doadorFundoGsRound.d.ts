import { Tastypie } from "ts-resource-tastypie";
export declare class OrgFundGsRound extends Tastypie.Model<OrgFundGsRound> {
    static resource: Tastypie.Resource<OrgFundGsRound>;
    gs_id: number;
    total_amount: number;
    qty_disbursement: number;
    dt_application_start: string;
    set_application_end: boolean;
    dt_application_end: string;
    dt_evaluation_start: string;
    set_evaluation_end: boolean;
    dt_evaluation_end: string;
    dt_implementation_start: string;
    dt_implementation_end: string;
    min_invested: number;
    max_invested: number;
    set_winners: boolean;
    qty_winners: number;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
