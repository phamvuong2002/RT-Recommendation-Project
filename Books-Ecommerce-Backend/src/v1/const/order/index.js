const ORDER_STATUS = {
  PROCESSING: "Processing",
  COMPLETED: "Completed",
  SHIPPING: "Shipping",
  REFUNDED: "Refunded",
  CANCELLED: "Cancelled",
};

const ORDER_DETAIL_STATUS = {
  PENDING_CONFIRMATION: "PendingConfirmation",
  PENDING_DELIVERY: "PendingDelivery",
  DELIVERED: "Delivered",
  REFUNDED: "Refunded",
  CANCELLED: "Cancelled",
};

const TRANSACTION_STATUS = {
  PENDING: "Pending",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

module.exports = {
  ORDER_STATUS,
  ORDER_DETAIL_STATUS,
  TRANSACTION_STATUS,
};
