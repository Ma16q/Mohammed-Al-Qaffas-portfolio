export const RECIPIENT_EMAIL = 'mohammed.alqaffas1@gmail.com';

export interface SendResult {
  needsActivation: boolean;
}

// Sends an email via the FormSubmit AJAX endpoint directly to RECIPIENT_EMAIL.
// Throws when the service rejects the request so callers can fall back.
export const sendMessage = async (fields: Record<string, string>, subject: string): Promise<SendResult> => {
  const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      ...fields,
      _subject: subject,
      _template: 'table'
    })
  });

  const data = await response.json();

  if (response.ok || data.success === 'true' || data.success === true) {
    return { needsActivation: false };
  }

  // First-time submissions need the owner to confirm the form by email
  if (data.message && data.message.includes('Activation')) {
    return { needsActivation: true };
  }

  throw new Error(data.message || 'Error sending message');
};
