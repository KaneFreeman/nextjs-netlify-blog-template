import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { MouseEvent, useCallback } from 'react';
import { MenuLink } from '../../lib/menu';
import useNavigate from '../../util/useNavigate';

interface MobileNavLinkProps {
  link: MenuLink;
  onClick: (event: MouseEvent) => void;
}

const MobileNavLink = ({ link: { url, page, title }, onClick }: MobileNavLinkProps) => {
  const navigate = useNavigate();

  const handleOnClick = useCallback(
    (event: MouseEvent) => {
      if (url) {
        navigate(url);
      } else if (page) {
        navigate(`/${page}`);
      }
      onClick(event);
    },
    [navigate, onClick, page, url]
  );

  return (
    <ListItemButton sx={{ pl: 4, color: '#d6bf86' }} onClick={handleOnClick}>
      <ListItemText primary={title} />
    </ListItemButton>
  );
};

export default MobileNavLink;
