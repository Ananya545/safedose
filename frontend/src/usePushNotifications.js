import { useEffect, useState } from 'react';

const usePushNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState(false);

  useEffect(() => {
    // Check if notifications are supported
    if ('Notification' in window) {
      setIsSupported(true);
      checkNotificationPermission();
    }
  }, []);

  const checkNotificationPermission = () => {
    if (Notification.permission === 'granted') {
      setSubscription(true);
    }
  };

  const subscribeToPushNotifications = async () => {
    try {
      // Request permission
      const permission = await Notification.requestPermission();
      
      if (permission !== 'granted') {
        alert('❌ Please allow notifications in your browser settings to enable this feature');
        return;
      }

      setSubscription(true);

      // Save to backend
      try {
        const token = localStorage.getItem('token');
        await fetch('http://localhost:5001/api/push-subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            subscription: {
              enabled: true,
              timestamp: new Date().toISOString()
            }
          })
        });
        console.log('Push notifications saved to backend');
      } catch (error) {
        console.log('Backend save error (non-critical):', error);
      }

      // Show test notification
      setTimeout(() => {
        sendNotification('SafeDose 💊', {
          body: '✅ Push notifications enabled! You will get alerts when medicines are expiring soon.',
          icon: '🔔'
        });
      }, 500);

    } catch (error) {
      console.error('Notification error:', error);
      alert('Error: ' + error.message);
    }
  };

  const sendNotification = (title, options) => {
    if (isSupported && Notification.permission === 'granted') {
      new Notification(title, {
        icon: '💊',
        badge: '🔔',
        ...options
      });
    }
  };

  const sendExpiryNotification = (medicineName, daysLeft) => {
    if (isSupported && Notification.permission === 'granted') {
      if (daysLeft <= 0) {
        sendNotification('⚠️ Medicine Expired!', {
          body: `${medicineName} has expired. Please dispose of it safely.`,
          tag: 'expiry-alert'
        });
      } else if (daysLeft <= 7) {
        sendNotification('⚠️ Medicine Expiring Soon!', {
          body: `${medicineName} expires in ${daysLeft} days. Please use it soon.`,
          tag: 'expiry-warning'
        });
      }
    }
  };

  return {
    isSupported,
    subscription,
    subscribeToPushNotifications,
    sendNotification,
    sendExpiryNotification
  };
};

export default usePushNotifications;