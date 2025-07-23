import React, { useState } from 'react';
import { Crown, Check, Upload, Phone, DollarSign, CreditCard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PremiumPage: React.FC = () => {
  const { userProfile, updateUserProfile } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState<'telebirr' | 'ebirr' | 'bank'>('telebirr');
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const features = [
    'Access to all subjects and questions',
    'Mid and Final exam collections (2021-2025)',
    'Unlimited practice tests',
    'Detailed explanations for all questions',
    'Progress tracking and analytics',
    'Download notes and handouts',
    'Priority customer support',
    'Ad-free experience'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentScreenshot(file);
    }
  };

  const handleSubmit = async () => {
    if (!paymentScreenshot) {
      alert('Please upload a payment screenshot');
      return;
    }

    setLoading(true);
    
    // Simulate submission process
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 2000);
  };

  if (userProfile?.isPremium) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 text-white text-center">
            <Crown className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">You're a Premium Member!</h1>
            <p className="text-yellow-100 text-lg">
              Enjoy unlimited access to all features and content
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Premium Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Submitted!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your payment submission. Our team will verify your payment within 24 hours.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800">
                <strong>What's next?</strong><br />
                • We'll verify your payment within 24 hours<br />
                • You'll receive a confirmation email once approved<br />
                • Your premium features will be activated automatically
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 mb-2">Need help? Contact us:</p>
              <div className="flex items-center justify-center space-x-2 text-blue-600">
                <Phone className="h-4 w-4" />
                <span>+251994024681</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Go Premium</h1>
          <p className="text-xl text-gray-600">Unlock unlimited access to all exam materials</p>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Premium Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Options */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Payment Method</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={() => setSelectedMethod('telebirr')}
              className={`p-6 rounded-xl border-2 transition-colors ${
                selectedMethod === 'telebirr'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Phone className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Telebirr</h3>
              <p className="text-sm text-gray-600">Mobile payment</p>
            </button>

            <button
              onClick={() => setSelectedMethod('ebirr')}
              className={`p-6 rounded-xl border-2 transition-colors ${
                selectedMethod === 'ebirr'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Ebirr</h3>
              <p className="text-sm text-gray-600">Digital wallet</p>
            </button>

            <button
              onClick={() => setSelectedMethod('bank')}
              className={`p-6 rounded-xl border-2 transition-colors ${
                selectedMethod === 'bank'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CreditCard className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Bank Transfer</h3>
              <p className="text-sm text-gray-600">Commercial Bank</p>
            </button>
          </div>

          {/* Payment Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Details</h3>
            
            {selectedMethod === 'telebirr' && (
              <div>
                <p className="text-gray-700 mb-2"><strong>Telebirr Number:</strong> +251994024681</p>
                <p className="text-gray-700 mb-2"><strong>Amount:</strong> 500 ETB</p>
                <p className="text-sm text-gray-600">Send payment to the above number and upload screenshot below</p>
              </div>
            )}

            {selectedMethod === 'ebirr' && (
              <div>
                <p className="text-gray-700 mb-2"><strong>Ebirr Number:</strong> +251994024681</p>
                <p className="text-gray-700 mb-2"><strong>Amount:</strong> 500 ETB</p>
                <p className="text-sm text-gray-600">Send payment to the above number and upload screenshot below</p>
              </div>
            )}

            {selectedMethod === 'bank' && (
              <div>
                <p className="text-gray-700 mb-2"><strong>Bank:</strong> Commercial Bank of Ethiopia</p>
                <p className="text-gray-700 mb-2"><strong>Account Number:</strong> 1000611141657</p>
                <p className="text-gray-700 mb-2"><strong>Account Name:</strong> Biniam</p>
                <p className="text-gray-700 mb-2"><strong>Amount:</strong> 500 ETB</p>
                <p className="text-sm text-gray-600">Transfer to the above account and upload receipt below</p>
              </div>
            )}
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Payment Screenshot/Receipt
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="payment-upload"
              />
              <label htmlFor="payment-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">
                  {paymentScreenshot ? paymentScreenshot.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!paymentScreenshot || loading}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Payment'}
          </button>

          {/* Contact Info */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2 text-blue-800">
              <Phone className="h-5 w-5" />
              <span className="font-medium">Need Help?</span>
            </div>
            <p className="text-blue-700 mt-1">
              Contact our admin for support: <strong>+251994024681</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;