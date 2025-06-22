import React from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,

} from '@mui/material';


const Dashboard: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 2 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>

            <Grid component="div" container spacing={3}>
                {/* Card 1: Total Submissions */}
                <Grid>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6">Total Submissions</Typography>
                        <Typography variant="h4" color="primary">124</Typography>
                    </Paper>
                </Grid>

                {/* Card 2: Active Users */}
                <Grid >
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6">Active Users</Typography>
                        <Typography variant="h4" color="secondary">23</Typography>
                    </Paper>
                </Grid>

                {/* Card 3: Pending Approvals */}
                <Grid >
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6">Pending Approvals</Typography>
                        <Typography variant="h4" color="error">5</Typography>
                    </Paper>
                </Grid>

                {/* Activity/Chart Area Placeholder */}

            </Grid>
        </Container>
    );
};

export default Dashboard;
