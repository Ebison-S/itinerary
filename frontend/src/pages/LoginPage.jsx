import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loginUser, selectAuthStatus, selectAuthError, clearAuthError } from '../features/auth/authSlice';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const status = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectAuthError);

  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => () => dispatch(clearAuthError()), [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(form));
    if (loginUser.fulfilled.match(result)) {
      toast.success('Welcome back');
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    }
  };

  return (
    <div>
      <h1 className="font-display text-display-sm font-bold mb-2">Welcome back</h1>
      <p className="text-sm text-ink-soft mb-8">Sign in to pick up where you left off.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && <p className="text-sm text-coral-deep font-bold">{error}</p>}

        <Button type="submit" loading={status === 'loading'} className="w-full mt-2">
          Sign in
        </Button>
      </form>

      <p className="text-sm text-ink-soft mt-7">
        New to Waypoint?{' '}
        <Link to="/register" className="text-coral font-bold hover:text-coral-deep hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}