// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import { Tastypie } from "ts-resource-tastypie";

export class OrgFundGsRound extends Tastypie.Model<OrgFundGsRound> {
    public static resource = new Tastypie.Resource<OrgFundGsRound>('doador-fundo-gs-round/round', {model: OrgFundGsRound});
    public static resource_add_round = new Tastypie.Resource<any>('doador-fundo-gs-round/add-round');

    public gs_id: number;
    public total_amount: number;
    public qty_disbursement: number;
    public dt_application_start: string;
    public set_application_end: boolean;
    public dt_application_end: string;
    public dt_evaluation_start: string;
    public set_evaluation_end: boolean;
    public dt_evaluation_end: string;
    public dt_implementation_start: string;
    public dt_implementation_end: string;
    public min_invested: number;
    public max_invested: number;
    public set_winners: boolean;
    public qty_winners: number;
    public order: number;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any){
        super(OrgFundGsRound.resource, obj);
    }
}
