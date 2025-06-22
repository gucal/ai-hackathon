import React, { useState } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import {
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
} from '@mui/material';

interface Report {
    id: number;
    title: string;
    date: string; // ISO string
    status: 'Completed' | 'Pending' | 'Failed';
    owner: string;
}

const mockReports: Report[] = [
    { id: 1, title: 'Sales Q1', date: '2025-03-31', status: 'Completed', owner: 'Alice' },
    { id: 2, title: 'User Signup', date: '2025-04-15', status: 'Pending', owner: 'Bob' },
    { id: 3, title: 'System Audit', date: '2025-02-10', status: 'Failed', owner: 'Charlie' },
    { id: 4, title: 'Performance Review', date: '2025-01-20', status: 'Completed', owner: 'Alice' },
    { id: 5, title: 'Marketing Campaign', date: '2025-04-05', status: 'Completed', owner: 'Diana' },
    { id: 6, title: 'Customer Feedback', date: '2025-03-22', status: 'Pending', owner: 'Bob' },
    { id: 7, title: 'Budget Analysis', date: '2025-02-28', status: 'Failed', owner: 'Eve' },
    { id: 8, title: 'Product Launch', date: '2025-05-10', status: 'Completed', owner: 'Frank' },
    { id: 9, title: 'Security Review', date: '2025-04-18', status: 'Pending', owner: 'Charlie' },
    { id: 10, title: 'Compliance Check', date: '2025-01-15', status: 'Completed', owner: 'Alice' },
    { id: 11, title: 'User Retention', date: '2025-04-30', status: 'Pending', owner: 'Diana' },
    { id: 12, title: 'Server Maintenance', date: '2025-03-10', status: 'Failed', owner: 'Frank' },
];

type Order = 'asc' | 'desc';

const Reports: React.FC = () => {
    const [orderBy, setOrderBy] = useState<keyof Report>('date');
    const [order, setOrder] = useState<Order>('asc');
    const [filterStatus, setFilterStatus] = useState<string>('All');

    const handleSort = (property: keyof Report) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        setFilterStatus(e.target.value as string);
    };

    const filteredReports = mockReports.filter(report =>
        filterStatus === 'All' ? true : report.status === filterStatus
    );

    const sortedReports = filteredReports.sort((a, b) => {
        if (orderBy === 'date') {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return order === 'asc' ? dateA - dateB : dateB - dateA;
        }
        if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
        if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
        return 0;
    });

    return (
        <Container maxWidth="lg" sx={{ mt: 2 }}>
            <Typography variant="h4" gutterBottom>
                Reports
            </Typography>

            <Box sx={{ mb: 2, width: 200 }}>
                <FormControl fullWidth>
                    <InputLabel>Status Filter</InputLabel>
                    <Select value={filterStatus} label="Status Filter" onChange={handleFilterChange}>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Failed">Failed</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'title'}
                                    direction={orderBy === 'title' ? order : 'asc'}
                                    onClick={() => handleSort('title')}
                                >
                                    Title
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'date'}
                                    direction={orderBy === 'date' ? order : 'asc'}
                                    onClick={() => handleSort('date')}
                                >
                                    Date
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'owner'}
                                    direction={orderBy === 'owner' ? order : 'asc'}
                                    onClick={() => handleSort('owner')}
                                >
                                    Owner
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {sortedReports.map(report => (
                            <TableRow key={report.id}>
                                <TableCell>{report.title}</TableCell>
                                <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                                <TableCell>{report.status}</TableCell>
                                <TableCell>{report.owner}</TableCell>
                            </TableRow>
                        ))}

                        {sortedReports.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No reports found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Reports;
