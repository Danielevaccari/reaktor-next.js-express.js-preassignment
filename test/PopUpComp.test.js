import React from 'react';
import '@testing-library/dom'
import { render } from '@testing-library/react'
import { PopUpComp } from '../components/PopUpComp'


describe('Tests for the pop up component', () =>

    test('PopUPComp', () => {
        const comp = render(<PopUpComp />)
        expect(comp).toBeTruthy()
    })
)