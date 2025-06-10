const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Simulated payslip data (replace with database in production)
const payslips = [
    {
        id: 'EMP12345',
        name: 'John Doe',
        department: 'IT',
        position: 'Software Engineer',
        basicSalary: 275000.00,
        allowances: 27500.00,
        bonus: 11000.00,
        tax: 62700.00,
        insurance: 11000.00
    },
    {
        id: 'EMP54321',
        name: 'Jane Smith',
        department: 'HR',
        position: 'HR Manager',
        basicSalary: 180000.00,
        allowances: 18000.00,
        bonus: 9000.00,
        tax: 41000.00,
        insurance: 9000.00
    },
    {
        id: 'EMP67890',
        name: 'Carlos Reyes',
        department: 'Finance',
        position: 'Accountant',
        basicSalary: 150000.00,
        allowances: 15000.00,
        bonus: 7000.00,
        tax: 32000.00,
        insurance: 7000.00
    }
];

// Calculate derived fields
function calculatePayslip(payslip) {
    const totalEarnings = payslip.basicSalary + payslip.allowances + payslip.bonus;
    const totalDeductions = payslip.tax + payslip.insurance;
    const netSalary = totalEarnings - totalDeductions;
    return {
        ...payslip,
        totalEarnings,
        totalDeductions,
        netSalary
    };
}

// API endpoint to fetch payslip by employee ID
app.get('/api/payslip/:id', (req, res) => {
    const payslip = payslips.find(p => p.id === req.params.id);
    if (payslip) {
        res.json(calculatePayslip(payslip));
    } else {
        res.status(404).json({ error: 'Payslip not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});