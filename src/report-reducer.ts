import { Order } from './i-face-order';

export const reportReducer = (report:Map<string,string>, order: Order): Map<string,string> =>{
  const {customerId,datePlaced} = order;
  const knownDate = report.get(customerId);
  if(typeof knownDate === 'undefined' || knownDate.localeCompare(datePlaced)<0){
    report.set(customerId, datePlaced);
  }
  return report;
};
