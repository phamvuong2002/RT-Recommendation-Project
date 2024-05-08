export const determineBillStatus = (order, billStatusMap) => {
    const statusCounts = {
        "PendingConfirmation": 0,
        "PendingDelivery": 0,
        "Delivered": 0,
        "Cancelled": 0,
        "Refunded": 0
    };

    order.forEach(item => {
        if (item.status in statusCounts) {
            statusCounts[item.status]++;
        }
    });

    const totalOrders = order.length;

    if (statusCounts.Delivered + statusCounts.Cancelled === totalOrders) {
        return "Completed"
    } else if (statusCounts.PendingConfirmation > statusCounts.PendingDelivery) {
        return "Processing"
    } else if (statusCounts.PendingDelivery === 1 && (statusCounts.PendingConfirmation < statusCounts.PendingDelivery)) {
        return "Shipping"
    } else if (statusCounts.Refunded === 1) {
        return "Refunded"
    } else {
        return "Processing"
    }
}
