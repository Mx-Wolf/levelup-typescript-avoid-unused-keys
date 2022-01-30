import { reportReducer } from './report-reducer';
import { Order } from './i-face-record';
import { expect } from 'chai';

const testInt = (upper = 42)=>Math.floor(upper* Math.random());
const testString = (upper=42)=> `${testInt(upper)}/${testInt(upper)}-${testInt(upper)}`;
const testDate = (upper=42) => new Date(new Date().setDate(-1* testInt(upper))).toISOString();

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
});