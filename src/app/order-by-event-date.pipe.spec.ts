import { OrderByEventDatePipe } from './order-by-event-date.pipe';

describe('OrderByEventDatePipe', () => {
  it('create an instance', () => {
    const pipe = new OrderByEventDatePipe();
    expect(pipe).toBeTruthy();
  });
});
