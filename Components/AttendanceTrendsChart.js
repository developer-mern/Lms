import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AttendanceTrendsChart = () => {
    // Chart data
    const data = {
        present: [3, 0],
        absent: [0, 2],
        late: [0, 0],
        excused: [1, 2]
    };

    const maxValue = 3;
    const chartHeight = 160;
    const chartWidth = 250;

    // Calculate positions for data points
    const getYPosition = (value) => {
        return chartHeight - (value / maxValue) * chartHeight;
    };

    const getXPosition = (index) => {
        return (index / 1) * chartWidth;
    };

    const DataPoint = ({ x, y, color }) => (
        <View
            style={[
                styles.dataPoint,
                {
                    backgroundColor: color,
                    left: x - 4,
                    top: y - 4,
                }
            ]}
        />
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Attendance Trends</Text>
                <Text style={styles.subtitle}>Daily attendance patterns over time</Text>
            </View>

            {/* Chart Area */}
            <View style={styles.chartContainer}>
                {/* Y-axis labels */}
                <View style={styles.yAxisContainer}>
                    <Text style={styles.yAxisLabel}>3</Text>
                    <Text style={styles.yAxisLabel}>2.25</Text>
                    <Text style={styles.yAxisLabel}>1.5</Text>
                    <Text style={styles.yAxisLabel}>0.75</Text>
                    <Text style={styles.yAxisLabel}>0</Text>
                </View>

                {/* Chart with grid and data */}
                <View style={styles.chartArea}>
                    {/* Grid lines */}
                    <View style={[styles.gridLine, { top: 0 }]} />
                    <View style={[styles.gridLine, { top: chartHeight * 0.25 }]} />
                    <View style={[styles.gridLine, { top: chartHeight * 0.5 }]} />
                    <View style={[styles.gridLine, { top: chartHeight * 0.75 }]} />
                    <View style={[styles.gridLine, { top: chartHeight }]} />

                    {/* Data points */}
                    <DataPoint
                        x={getXPosition(0)}
                        y={getYPosition(data.present[0])}
                        color="#4CAF50"
                    />
                    <DataPoint
                        x={getXPosition(1)}
                        y={getYPosition(data.present[1])}
                        color="#4CAF50"
                    />
                    <DataPoint
                        x={getXPosition(0)}
                        y={getYPosition(data.absent[0])}
                        color="#F44336"
                    />
                    <DataPoint
                        x={getXPosition(1)}
                        y={getYPosition(data.absent[1])}
                        color="#F44336"
                    />
                    <DataPoint
                        x={getXPosition(0)}
                        y={getYPosition(data.excused[0])}
                        color="#2196F3"
                    />
                    <DataPoint
                        x={getXPosition(1)}
                        y={getYPosition(data.excused[1])}
                        color="#2196F3"
                    />
                </View>
            </View>

            {/* X-axis labels */}
            <View style={styles.xAxisContainer}>
                <Text style={styles.xAxisLabel}>Jul 16</Text>
                <Text style={styles.xAxisLabel}>Jul 17</Text>
            </View>

            {/* Legend */}
            <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
                    <Text style={styles.legendText}>Present</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#F44336' }]} />
                    <Text style={styles.legendText}>Absent</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#FFC107' }]} />
                    <Text style={styles.legendText}>Late</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#2196F3' }]} />
                    <Text style={styles.legendText}>Excused</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    header: {
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    chartContainer: {
        flexDirection: 'row',
        height: 160,
    },
    yAxisContainer: {
        justifyContent: 'space-between',
        marginRight: 8,
        paddingVertical: 8,
    },
    yAxisLabel: {
        fontSize: 12,
        color: '#666',
    },
    chartArea: {
        flex: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        marginBottom: 16,
    },
    gridLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#eee',
    },
    dataPoint: {
        position: 'absolute',
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    xAxisContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 8,
    },
    xAxisLabel: {
        fontSize: 12,
        color: '#666',
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
        flexWrap: 'wrap',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 4,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    legendText: {
        fontSize: 12,
        color: '#666',
    },
});

export default AttendanceTrendsChart;