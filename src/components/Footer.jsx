import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faFacebook, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const socials = [
  { icon: faYoutube,  label: 'YouTube'  },
  { icon: faFacebook, label: 'Facebook' },
  { icon: faXTwitter, label: 'X'        },
];

const footerLinks = ['Privacy Policy', 'Terms of Service', 'Cookies'];

export default function Footer() {
  return (
    <footer className="bg-[#1e3a32] text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-3">
            <span className="font-bold">Keen</span>
            <span className="font-medium">Keeper</span>
          </h2>
          <p className="text-[#8fb5a8] text-sm max-w-sm mx-auto leading-relaxed">
            Your personal shelf of meaningful connections. Browse, tend, and nurture
            the relationships that matter most.
          </p>

          <p className="text-[#8fb5a8] text-sm font-medium mt-8 mb-3">Social Links</p>
          <div className="flex items-center justify-center gap-3">
            {socials.map(({ icon, label }) => (
              <button
                key={label}
                aria-label={label}
                className="w-10 h-10 rounded-full bg-[#2d5a4e] hover:bg-[#3a7264] flex items-center justify-center transition-colors"
              >
                <FontAwesomeIcon icon={icon} className="text-sm" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#2d5a4e]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[#5a8a7a] text-xs">© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex gap-5">
            {footerLinks.map((item) => (
              <button key={item} className="text-[#5a8a7a] text-xs hover:text-white transition-colors">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
