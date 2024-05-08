'use strict'

const DISCOUNT_WALLET_STATUS = {
    ACTIVE: 'active', 
    INACTIVE: 'inactive',
    OUTDATE: 'outdate',
}

const DISCOUNT_APPLY_TO = {
    ALL: 'all', 
    SPECIFIC: 'specific',
}

const DISCOUNT_TYPE = {
    FIXED_AMOUNT: 'fixed_amount', 
    PERCENTAGE: 'percentage',
}

module.exports = {
    DISCOUNT_WALLET_STATUS,
    DISCOUNT_APPLY_TO,
    DISCOUNT_TYPE
}