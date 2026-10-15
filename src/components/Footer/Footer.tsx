import { useState } from 'react';
import './Footer.css';

function Footer() {
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const year = new Date().getFullYear();

  function subscribeToNewsletter(formData: FormData) {
    const emailEntry = formData.get('email');

    if (typeof emailEntry !== 'string') {
      return;
    }

    const email = emailEntry.trim();

    if (email === '') {
      return;
    }

    setSubscribedEmail(email);
  }

  return (
    <footer className="copyright">
      <form className="newsletter" action={subscribeToNewsletter}>
        <label htmlFor="newsletter-email">
          Adresse e-mail pour recevoir la newsletter
        </label>
        <div className="newsletter-fields">
          <input
            id="newsletter-email"
            name="email"
            type="email"
            placeholder="nom@exemple.fr"
            autoComplete="email"
            required
          />
          <button type="submit">S’abonner</button>
        </div>
      </form>

      {subscribedEmail !== '' && (
        <p className="newsletter-confirmation" role="status">
          Vous êtes maintenant abonné avec l’adresse {subscribedEmail}.
        </p>
      )}

      <p>Dev Of Thrones, le blog du développement web — {year} ©</p>
    </footer>
  );
}

export default Footer;
