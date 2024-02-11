import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import TrxPage from '@/app/edu/[trx]/page'
import TestTrxPage from '@/app/test/[trx]/page'


jest.mock('../src/app/utils', () => ({
    getCachedUser: jest.fn().mockReturnValue([{ value: "test", label: "test" }])
}));

describe('Home', () => {
    it('renders peed', async () => {
        await act(async () => {
            render(await TrxPage({ params: { trx: 'peed' } }))
        });

        const heading = screen.getByText(/Inmate Education search TRA/i)

        expect(heading).toBeInTheDocument()
    })
})