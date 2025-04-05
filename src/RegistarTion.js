import React, { useState } from 'react';
import './regis.css'; // You would create this CSS file separately

const FormValidation = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // Error state
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // Password visibility state
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Toggle password visibility
  const togglePassword = (field) => {
    setShowPassword(prevState => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  // Clear all errors
  const clearErrors = () => {
    setErrors({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
  };

  // Validate form
  const validateForm = (e) => {
    e.preventDefault();
    
    let isValid = true;
    const newErrors = { ...errors };
    clearErrors();

    // Name validation
    if (formData.name.trim().length < 5) {
      newErrors.name = '*Name must be at least 5 characters long';
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(formData.name.trim())) {
      newErrors.name = '*Name should contain only letters and spaces';
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.trim().length === 0) {
      newErrors.email = '*Email must be filled out';
      isValid = false;
    } else if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = '*Please enter a valid email address';
      isValid = false;
    }

    // Phone validation
    const phonePattern = /^\d{10}$/;
    if (formData.phone.trim().length === 0) {
      newErrors.phone = '*Phone number must be filled out';
      isValid = false;
    } else if (!phonePattern.test(formData.phone.trim())) {
      newErrors.phone = '*Phone number must be exactly 10 digits';
      isValid = false;
    }

    // Password validation
    if (formData.password.length <= 5) {
      newErrors.password = '*Password must be at least 6 characters long';
      isValid = false;
    }

    // Confirm password validation
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = '*Confirm Password must match Password';
      isValid = false;
    }

    setErrors(newErrors);

    // If form is valid
    if (isValid) {
      alert(
        `Form submitted successfully!\n\nDetails:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}`
      );
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      });
      
      // Reset password visibility
      setShowPassword({
        password: false,
        confirmPassword: false
      });
    }

    return isValid;
  };

  return (
    <div className="container">
      <h1>Welcome to my website</h1>
      <p>This is a simple React Form Validation.</p>
      
      <form onSubmit={validateForm} id="myForm">
        <div className="form-group" id="form-name">
          <label htmlFor="name">
            Name: <span className="error-message">{errors.name}</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group" id="form-email">
          <label htmlFor="email">
            Email: <span className="error-message">{errors.email}</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group" id="form-phone">
          <label htmlFor="phone">
            Phone: <span className="error-message">{errors.phone}</span>
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group" id="form-password">
          <label htmlFor="password">
            Password: <span className="error-message">{errors.password}</span>
          </label>
          <div className="password-container">
            <input
              type={showPassword.password ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            <span 
              className="toggle-password" 
              onClick={() => togglePassword('password')}
            >
              {showPassword.password ? "❌" : "👁️"}
            </span>
          </div>
        </div>
        
        <div className="form-group" id="form-confirm-password">
          <label htmlFor="confirmPassword">
            Confirm Password: <span className="error-message">{errors.confirmPassword}</span>
          </label>
          <div className="password-container">
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span 
              className="toggle-password" 
              onClick={() => togglePassword('confirmPassword')}
            >
              {showPassword.confirmPassword ? "❌" : "👁️"}
            </span>
          </div>
        </div>
        
        <input type="submit" value="Submit" id="submit-button" />
      </form>
    </div>
  );
};

export default FormValidation;