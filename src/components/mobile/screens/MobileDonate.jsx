import React, { useState } from 'react';
import { Heart, CreditCard, DollarSign } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { mockApi } from '../../../services/mockApi';
import { toast } from 'sonner';

const MobileDonate = () => {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const presetAmounts = [25, 50, 100, 250];

  const handleDonate = async () => {
    const donationAmount = amount === 'custom' ? parseFloat(customAmount) : parseFloat(amount);
    
    if (!donationAmount || donationAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsProcessing(true);
    
    try {
      const result = await mockApi.processDonation({
        amount: donationAmount,
        paymentMethod
      });
      
      if (result.success) {
        toast.success('Thank you for your donation!');
        setAmount('');
        setCustomAmount('');
      }
    } catch (error) {
      toast.error('Donation failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FFC600] to-[#FFAA00] px-4 py-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center">
            <Heart className="h-8 w-8 text-gray-900" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Make a Donation</h1>
          <p className="text-gray-800">Support our mission for positive change</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Amount Selection */}
        <div className="bg-white rounded-2xl p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Select Amount</h3>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset.toString())}
                className={`p-4 rounded-xl border-2 transition-colors ${
                  amount === preset.toString()
                    ? 'border-[#FFC600] bg-[#FFC600]/10'
                    : 'border-gray-200'
                }`}
              >
                <div className="text-lg font-bold text-gray-900">${preset}</div>
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setAmount('custom')}
            className={`w-full p-4 rounded-xl border-2 transition-colors mb-3 ${
              amount === 'custom'
                ? 'border-[#FFC600] bg-[#FFC600]/10'
                : 'border-gray-200'
            }`}
          >
            <span className="font-medium text-gray-900">Custom Amount</span>
          </button>
          
          {amount === 'custom' && (
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="number"
                placeholder="Enter amount"
                className="pl-10 h-12"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
          
          <div className="space-y-3">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full p-4 rounded-xl border-2 flex items-center space-x-3 ${
                paymentMethod === 'card'
                  ? 'border-[#FFC600] bg-[#FFC600]/10'
                  : 'border-gray-200'
              }`}
            >
              <CreditCard className="h-6 w-6 text-gray-600" />
              <span className="font-medium">Credit/Debit Card</span>
            </button>
          </div>
        </div>

        {/* Impact Preview */}
        <div className="bg-blue-50 rounded-2xl p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Your Impact</h3>
          <p className="text-sm text-blue-800">
            {amount && amount !== 'custom' 
              ? `$${amount} can help fund community programs that benefit families across the Bahamas.`
              : customAmount
              ? `$${customAmount} can help fund community programs that benefit families across the Bahamas.`
              : 'Every donation makes a difference in our communities.'
            }
          </p>
        </div>

        {/* Donate Button */}
        <Button
          onClick={handleDonate}
          disabled={(!amount || (amount === 'custom' && !customAmount)) || isProcessing}
          className="w-full h-12 bg-[#FFC600] hover:bg-[#FFB700] text-gray-900 font-semibold text-lg"
        >
          {isProcessing ? 'Processing...' : 'Donate Now'}
        </Button>

        {/* Security Note */}
        <div className="text-center">
          <p className="text-xs text-gray-600">
            🔒 Your donation is secure and will be processed safely
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileDonate;