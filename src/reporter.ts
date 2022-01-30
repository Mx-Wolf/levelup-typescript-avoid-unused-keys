import { LastOrderReportLine } from './i-face-last-orders-report';
import { Order } from './i-face-order';
import { reportReducer } from './report-reducer';
import { reportSeed } from './report-seed';

export const createReport = (orders: Order[]):LastOrderReportLine=>orders.reduce(reportReducer, reportSeed());
