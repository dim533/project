import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (error) {
      console.error('Reset password error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md w-full space-y-4 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Check Your Email</h2>
        <p className="text-center text-gray-600">
          We've sent password reset instructions to your email address.
        </p>
        <Link
          to="/login"
          className="block text-center text-purple-600 hover:text-purple-700"
        >
          Return to login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full space-y-4 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Sending...' : 'Send Reset Instructions'}
        </Button>
      </form>
      <div className="text-center">
        <Link
          to="/login"
          className="text-sm text-purple-600 hover:text-purple-700"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
} 