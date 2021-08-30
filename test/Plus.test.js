import { Plus } from "../components/Plus";
import { render } from '@testing-library/react'

test('Pluys', () => {
    const comp = render(<Plus />)
    const co = comp.getByTestId('plus')
    expect(co).toBeTruthy()
})




test('Pluys', () => {
    const comp = render(<Plus />)
    const co = comp.getByTestId('plus')
    expect(co.textContent).toBe('hey')
})
