import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react'
import { PopUpComp } from '../components/PopUpComp'

test('PopUPComp', () => {
    const comp = render(<PopUpComp />)
    expect(comp).toBeTruthy()
})
