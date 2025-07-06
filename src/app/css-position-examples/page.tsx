'use client';
import Link from 'next/link';
import { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    Paper,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemText,
    Alert,
    IconButton,
    Tooltip,
    Menu,
    MenuItem,
    AppBar,
    Toolbar
} from '@mui/material';
import {
    ArrowBack,
    Info,
    CheckCircle,
    Warning,
    Star,
    ExpandMore,
    Close
} from '@mui/icons-material';

export default function CSSPositionExamples() {
    const [showOverlay, setShowOverlay] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
           <h1 style={{color: 'red' , position: 'sticky' }}> Ttitle</h1>
        <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
               
            {/* Sticky Navigation */}
            <AppBar
                position="sticky"
                sx={{
                    bgcolor: 'primary.main',
                    zIndex: 50,
                    boxShadow: 3
                }}
            >
                <Toolbar>
                    <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
                        <IconButton color="inherit">
                            <ArrowBack />
                        </IconButton>
                    </Link>
                    <Typography variant="h6" sx={{ ml: 2, color: 'white' }}>
                        CSS Position Properties - Complete Guide
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
                <Typography variant="h3" sx={{ mb: 4, color: 'primary.main', fontWeight: 'bold' }}>
                    🎯 Master CSS Position Properties
                </Typography>

                {/* Static Position */}
                <Card sx={{ mb: 4, bgcolor: 'white', boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h4" sx={{ mb: 2, color: 'blue.600', fontWeight: 'bold' }}>
                            1. Position: Static (Default)
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, color: 'grey.600' }}>
                            Static is the default positioning. Elements follow the normal document flow.
                            Top, right, bottom, left properties have NO effect on static elements.
                        </Typography>

                        <Paper
                            sx={{
                                p: 3,
                                bgcolor: 'grey.100',
                                border: '2px solid',
                                borderColor: 'grey.300',

                            }}
                        >
                            <Chip
                                label="Static Box 1"
                                sx={{
                                    bgcolor: 'blue',
                                    color: 'white',
                                    mr: 1,
                                    mb: 1
                                }}
                            />
                            <Chip
                                label="Static Box 2"
                                sx={{
                                    bgcolor: 'green',
                                    color: 'white',
                                    mr: 1,
                                    mb: 1
                                }}
                            />
                            <Chip
                                label="Static Box 3"
                                sx={{
                                    bgcolor: 'red',
                                    color: 'white',
                                    mb: 1
                                }}
                            />
                            <Typography variant="caption" sx={{ color: 'grey.600', display: 'block', mt: 2 }}>
                                These chips follow normal document flow. Even if we add top: 50px, it won't move them.
                            </Typography>
                        </Paper>
                    </CardContent>
                </Card>

                {/* Relative Position */}
                <Card sx={{ mb: 4, bgcolor: 'white', boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h4" sx={{ mb: 2, color: 'purple.600', fontWeight: 'bold' }}>
                            2. Position: Relative
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, color: 'grey.600' }}>
                        Useful when you want to move something slightly from where it was without removing it from layout </Typography>

                        <Paper
                            sx={{
                                p: 3,
                                bgcolor: 'grey.100',
                                border: '2px solid',
                                borderColor: 'grey.300',

                            }}
                        >
                            <Chip
                                label="Normal Box"
                                sx={{
                                    bgcolor: 'blue',
                                    color: 'white',
                                    mr: 1,
                                    mb: 1,
                                    position: 'sticky'
                                }}
                            />
                            <Chip
                                label="Relative Box (top: 16px, left: 16px)"
                                sx={{
                                    bgcolor: 'purple',
                                    color: 'white',
                                    mr: 1,
                                    mb: 1,
                                    position: 'relative',
                                    top: 2,
                                    left: 2
                                }}
                            />
                            <Chip
                                label="Another Normal Box"
                                sx={{
                                    bgcolor: 'green',
                                    color: 'white',
                                    mb: 1
                                }}
                            />
                            <Typography variant="caption" sx={{ color: 'grey.600', display: 'block', mt: 2 }}>
                                The purple chip is moved 16px down and 16px right from its original position, but still occupies its original space.
                            </Typography>
                        </Paper>
                    </CardContent>
                </Card>

                {/* Absolute Position */}
                <Card sx={{ mb: 4, bgcolor: 'white', boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h4" sx={{ mb: 2, color: 'orange.600', fontWeight: 'bold' }}>
                            3. Position: Absolute
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, color: 'grey.600' }}>
                            Absolute positioning removes the element from the document flow and positions it relative to its nearest positioned ancestor
                            (an ancestor with position other than static). If no positioned ancestor exists, it positions relative to the viewport.
                        </Typography>

                        <Paper
                            sx={{
                                p: 3,
                                bgcolor: 'grey.100',
                                border: '2px solid',
                                borderColor: 'grey.300',
                                position: 'relative',
                                height: 200
                            }}
                        >
                            <Chip
                                label="Container Box (relative)"
                                sx={{
                                    bgcolor: 'blue',
                                    color: 'white',
                                    mb: 1
                                }}
                            />
                            <Chip
                                label="Absolute Box (top: 8px, right: 8px)"
                                sx={{
                                    bgcolor: 'orange',
                                    color: 'white',
                                    position: 'absolute',
                                    top: 1,
                                    right: 1
                                }}
                            />
                            <Chip
                                label="Absolute Box (bottom: 8px, left: 8px)"
                                sx={{
                                    bgcolor: 'green',
                                    color: 'white',
                                    position: 'absolute',
                                    bottom: 1,
                                    left: 1
                                }}
                            />
                            <Typography variant="caption" sx={{ color: 'grey.600', display: 'block', mt: 2 }}>
                                The orange and green chips are positioned absolutely within their relative parent container.
                            </Typography>
                        </Paper>
                    </CardContent>
                </Card>

                {/* Fixed Position */}
                <Card sx={{ mb: 4, bgcolor: 'white', boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h4" sx={{ mb: 2, color: 'red.600', fontWeight: 'bold' }}>
                            4. Position: Fixed
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, color: 'grey.600' }}>
                            Fixed positioning removes the element from the document flow and positions it relative to the viewport.
                            It stays in the same position even when scrolling.
                        </Typography>

                        <Paper
                            sx={{
                                p: 3,
                                bgcolor: 'grey.100',
                                border: '2px solid',
                                borderColor: 'grey.300',
                                position: 'relative',
                                height: 150
                            }}
                        >
                            <Chip
                                label="Container Box"
                                sx={{
                                    bgcolor: 'blue.500',
                                    color: 'white',
                                    mb: 2,
                                }}
                            />
                            <Button
                                variant="contained"
                                onClick={() => setShowOverlay(!showOverlay)}
                                sx={{
                                    bgcolor: 'red.500',
                                    '&:hover': { bgcolor: 'red.600' }
                                }}
                            >
                                Toggle Fixed Overlay
                            </Button>
                            <Typography variant="caption" sx={{ color: 'grey.600', display: 'block', mt: 2 }}>
                                Click the button to see a fixed overlay that stays in place when scrolling.
                            </Typography>
                        </Paper>
                    </CardContent>
                </Card>

                {/* Sticky Position */}
                <Card sx={{ mb: 4, bgcolor: 'white', boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h4" sx={{ mb: 2, color: 'teal.600', fontWeight: 'bold' }}>
                            5. Position: Sticky
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, color: 'grey.600' }}>
                            Sticky positioning is a hybrid of relative and fixed. The element is treated as relative until it crosses a threshold, then it becomes fixed.
                        </Typography>
                        <Box sx={{ border: '2px solid', borderColor: 'grey.300', bgcolor: 'grey.100', px: 0, py: 0 }}>
                            <Box sx={{ height: 40 }} />
                            <Box
                                sx={{
                                    bgcolor: 'teal',
                                    color: 'white',
                                    p: 2,
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 10,
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                }}
                            >
                                Sticky Header (sticky top-0)
                            </Box>
                            <Box sx={{ height: 600, bgcolor: 'grey.200', p: 2 }}>
                                <Typography variant="body2" sx={{ mb: 2 }}>Scroll content...</Typography>
                                <Typography variant="body2" sx={{ mb: 2 }}>More content...</Typography>
                                <Typography variant="body2" sx={{ mb: 2 }}>Even more content...</Typography>
                                <Typography variant="body2" sx={{ mb: 2 }}>Keep scrolling...</Typography>
                                <Typography variant="body2" sx={{ mb: 2 }}>Almost there...</Typography>
                                <Typography variant="body2" sx={{ mb: 2 }}>Final content...</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                {/* Z-Index Examples */}
                <Card sx={{ mb: 4, bgcolor: 'white', boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h4" sx={{ mb: 2, color: 'indigo.600', fontWeight: 'bold' }}>
                            6. Z-Index Stacking Context
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, color: 'grey.600' }}>
                            Z-index controls the stacking order of positioned elements. Higher values appear on top.
                        </Typography>

                        <Paper
                            sx={{
                                p: 3,
                                bgcolor: 'grey.100',
                                border: '2px solid',
                                borderColor: 'grey.300',
                                position: 'relative',
                                height: 200
                            }}
                        >
                            <Chip
                                label="Z-Index: 10"
                                sx={{
                                    bgcolor: 'blue.500',
                                    color: 'white',
                                    position: 'absolute',
                                    top: 2,
                                    left: 2,
                                    zIndex: 10
                                }}
                            />
                            <Chip
                                label="Z-Index: 20"
                                sx={{
                                    bgcolor: 'green.500',
                                    color: 'white',
                                    position: 'absolute',
                                    top: 4,
                                    left: 4,
                                    zIndex: 20
                                }}
                            />
                            <Chip
                                label="Z-Index: 30 (Top)"
                                sx={{
                                    bgcolor: 'red.500',
                                    color: 'white',
                                    position: 'absolute',
                                    top: 6,
                                    left: 6,
                                    zIndex: 30
                                }}
                            />
                            <Typography variant="caption" sx={{ color: 'grey.600', display: 'block', mt: 2 }}>
                                The red chip has the highest z-index, so it appears on top.
                            </Typography>
                        </Paper>
                    </CardContent>
                </Card>

                {/* Real-world Examples */}
                <Card sx={{ mb: 4, bgcolor: 'white', boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h4" sx={{ mb: 3, color: 'grey.800', fontWeight: 'bold' }}>
                            7. Real-World Use Cases
                        </Typography>

                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                            {/* Modal Example */}
                            <Paper sx={{ p: 3, bgcolor: 'grey.100', border: '2px solid', borderColor: 'grey.300', position: 'relative', height: 250 }}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Modal/Dialog</Typography>
                                <Chip
                                    label="Page Content"
                                    sx={{
                                        bgcolor: 'blue.500',
                                        color: 'white',
                                        mb: 2
                                    }}
                                />
                                <Box
                                    sx={{
                                        bgcolor: 'rgba(0,0,0,0.5)',
                                        position: 'absolute',
                                        inset: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Paper sx={{ p: 2, bgcolor: 'white', borderRadius: 1, boxShadow: 3 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Modal Content</Typography>
                                        <Typography variant="caption">Position: fixed or absolute</Typography>
                                    </Paper>
                                </Box>
                            </Paper>

                            {/* Tooltip Example */}
                            <Paper sx={{ p: 3, bgcolor: 'grey.100', border: '2px solid', borderColor: 'grey.300', position: 'relative', height: 250 }}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Tooltip</Typography>
                                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                    <Button
                                        variant="contained"
                                        onMouseEnter={() => setShowTooltip(true)}
                                        onMouseLeave={() => setShowTooltip(false)}
                                        sx={{ bgcolor: 'blue.500' }}
                                    >
                                        Hover me
                                    </Button>
                                    {showTooltip && (
                                        <Box
                                            sx={{
                                                bgcolor: 'grey.800',
                                                color: 'white',
                                                p: 1,
                                                borderRadius: 1,
                                                position: 'absolute',
                                                bottom: '100%',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                mb: 1,
                                                zIndex: 1000
                                            }}
                                        >
                                            Tooltip content
                                            <Box
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    bgcolor: 'grey.800',
                                                    position: 'absolute',
                                                    top: '100%',
                                                    left: '50%',
                                                    transform: 'translateX(-50%) rotate(45deg)'
                                                }}
                                            />
                                        </Box>
                                    )}
                                </Box>
                            </Paper>

                            {/* Dropdown Example */}
                            <Paper sx={{ p: 3, bgcolor: 'grey.100', border: '2px solid', borderColor: 'grey.300', position: 'relative', height: 250 }}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Dropdown Menu</Typography>
                                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                    <Button
                                        variant="contained"
                                        onClick={handleMenuClick}
                                        sx={{ bgcolor: 'blue.500' }}
                                    >
                                        Dropdown
                                        <ExpandMore />
                                    </Button>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleMenuClose}
                                        sx={{ mt: 1 }}
                                    >
                                        <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
                                        <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
                                        <MenuItem onClick={handleMenuClose}>Option 3</MenuItem>
                                    </Menu>
                                </Box>
                            </Paper>

                            {/* Sticky Navigation */}
                            <Paper sx={{ p: 3, bgcolor: 'grey.100', border: '2px solid', borderColor: 'grey.300', position: 'relative', height: 250, overflow: 'hidden' }}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Sticky Navigation</Typography>
                                <Box
                                    sx={{
                                        bgcolor: 'blue.500',
                                        color: 'white',
                                        p: 1.5,
                                        position: 'sticky',
                                        top: 0,
                                        textAlign: 'center',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Navigation Bar
                                </Box>
                                <Box sx={{ height: 150, bgcolor: 'grey.200', p: 2 }}>
                                    <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>Scroll content...</Typography>
                                    <Typography variant="caption" sx={{ display: 'block' }}>Navigation stays at top</Typography>
                                </Box>
                            </Paper>
                        </Box>
                    </CardContent>
                </Card>

                {/* Interview Tips */}
                <Card sx={{ mb: 4, bgcolor: 'blue.50', boxShadow: 3, borderLeft: '4px solid', borderColor: 'blue.500' }}>
                    <CardContent>
                        <Typography variant="h4" sx={{ mb: 3, color: 'blue.800', fontWeight: 'bold' }}>
                            Interview Tips & Key Points
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
                            <Box>
                                <Typography variant="h6" sx={{ mb: 2, color: 'blue.700', fontWeight: 'bold' }}>
                                    Key Concepts to Remember:
                                </Typography>
                                <List dense>
                                    <ListItem>
                                        <ListItemText
                                            primary="Static: Default, no positioning effect"
                                            primaryTypographyProps={{ fontWeight: 'bold' }}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Relative: Moves from original position, keeps space"
                                            primaryTypographyProps={{ fontWeight: 'bold' }}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Absolute: Removes from flow, positions to nearest positioned parent"
                                            primaryTypographyProps={{ fontWeight: 'bold' }}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Fixed: Removes from flow, positions to viewport"
                                            primaryTypographyProps={{ fontWeight: 'bold' }}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Sticky: Hybrid of relative and fixed"
                                            primaryTypographyProps={{ fontWeight: 'bold' }}
                                        />
                                    </ListItem>
                                </List>
                            </Box>
                            <Box>
                                <Typography variant="h6" sx={{ mb: 2, color: 'blue.700', fontWeight: 'bold' }}>
                                    Common Interview Questions:
                                </Typography>
                                <List dense>
                                    <ListItem>
                                        <ListItemText primary="What's the difference between absolute and fixed?" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="How does z-index work with positioned elements?" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="When would you use sticky positioning?" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="How do you center an absolutely positioned element?" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="What creates a new stacking context?" />
                                    </ListItem>
                                </List>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            {/* Fixed Overlay */}
            {showOverlay && (
                <Box
                    sx={{
                        position: 'fixed',
                        inset: 0,
                        bgcolor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
                    }}
                >
                    <Paper sx={{ p: 4, maxWidth: 400, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Fixed Position Overlay
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            This overlay is positioned fixed and stays in place even when scrolling.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => setShowOverlay(false)}
                            startIcon={<Close />}
                            sx={{ bgcolor: 'blue.500' }}
                        >
                            Close
                        </Button>
                    </Paper>
                </Box>
            )}
        </Box>
        </Box>
    );
} 