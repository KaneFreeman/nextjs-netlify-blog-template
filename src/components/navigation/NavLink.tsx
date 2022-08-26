import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { MouseEvent, useCallback } from 'react';
import { MenuLink } from '../../lib/menu';
import useNavigate from '../../util/useNavigate';

const StyledButton = styled(Button)`
  color: #680b12;
  padding: 0;
  text-transform: none;

  &:hover {
    color: #2e2e2e;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  width: 100%;
  font-size: 14px;
  font-family: inherit;
  padding: 10px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

interface NavLinkProps {
  link: MenuLink;
  onClick: (event: MouseEvent) => void;
}

const NavLink = ({ link: { url, page, title }, onClick }: NavLinkProps) => {
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
    <StyledButton sx={{ color: '#680b12', p: 0, textTransform: 'none' }}>
      <StyledMenuItem onClick={handleOnClick}>{title}</StyledMenuItem>
    </StyledButton>
  );
};

export default NavLink;
