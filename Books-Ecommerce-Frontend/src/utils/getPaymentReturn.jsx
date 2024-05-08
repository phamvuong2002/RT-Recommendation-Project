export const vnpay = (urlParams) => {
  const orderDetail = {
    vnp_Amount: urlParams.get('vnp_Amount'),
    vnp_BankCode: urlParams.get('vnp_BankCode'),
    vnp_BankTranNo: urlParams.get('vnp_BankTranNo'),
    vnp_CardType: urlParams.get('vnp_CardType'),
    vnp_OrderInfo: urlParams.get('vnp_OrderInfo'),
    vnp_PayDate: urlParams.get('vnp_PayDate'),
    vnp_ResponseCode: urlParams.get('vnp_ResponseCode'),
    vnp_TmnCode: urlParams.get('vnp_TmnCode'),
    vnp_TransactionNo: urlParams.get('vnp_TransactionNo'),
    vnp_TransactionStatus: urlParams.get('vnp_TransactionStatus'),
    vnp_TxnRef: urlParams.get('vnp_TxnRef'),
    vnp_SecureHash: urlParams.get('vnp_SecureHash'),
  };
  return orderDetail;
};
