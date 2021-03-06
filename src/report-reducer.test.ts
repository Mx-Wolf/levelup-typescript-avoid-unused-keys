import { reportReducer } from './report-reducer';
import { Order } from './i-face-order';
import { expect } from 'chai';

const testInt = (upper = 42)=>Math.floor(upper* Math.random());
const testString = (upper=42)=> `${testInt(upper)}/${testInt(upper)}-${testInt(upper)}`;
const testDate = (upper=42) => new Date(new Date().setDate(-1* testInt(upper))).toISOString();

const nextDate = (datePlaced: string): string =>{
  const rv = new Date(datePlaced);
  rv.setDate(rv.getDate()+1);
  return rv.toISOString();
};

describe('Поведение редуктора отчета последнего заказа reportReducer', () => {
  const getOrder = (): Order => ({
    orderId: testInt(),
    amountTotal: testInt(),
    customerId: testString(),
    datePlaced:testDate(),
    includeHandling: false,
    includeShipping: false,
    itemsCount: testInt(),
    taxTotal: testInt(),
  });
  it('использует данные из записи, когда встречает заказчика в первый раз',()=>{
    const order = getOrder();
    const result = reportReducer(new Map(),order);
    expect(result.has(order.customerId)).to.eq(true);
    expect(result.get(order.customerId)).to.eq(order.datePlaced);
  });
  it('обновляет дату последнего заказа',()=>{
    const order = getOrder();
    const result = reportReducer(
      new Map([[order.customerId, order.datePlaced]]),
      {...order, datePlaced: nextDate(order.datePlaced)},
    );
    const reported = result.get(order.customerId);
    expect(typeof reported !== 'undefined').to.eq(true);
    expect((reported as string)>order.datePlaced).to.eq(true);
  });
});
