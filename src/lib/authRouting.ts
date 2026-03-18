export type AccessRole = 'trial_user' | 'free_user' | 'premium_user';

type AccessRoleInput = {
  isGuestMode?: boolean;
  user?: {
    id?: string;
    plan?: 'trial' | 'free' | 'premium';
  } | null;
  profileUserRole?: string | null;
};

export function mapProfileRoleToAccessRole(profileRole?: string | null): AccessRole | null {
  switch (profileRole) {
    case 'trial':
      return 'trial_user';
    case 'free':
      return 'free_user';
    case 'premium':
      return 'premium_user';
    default:
      return null;
  }
}

export function getAccessRole({ isGuestMode, user, profileUserRole }: AccessRoleInput): AccessRole {
  if (isGuestMode || user?.id?.startsWith('guest_') || user?.plan === 'trial') {
    return 'trial_user';
  }

  const roleFromProfile = mapProfileRoleToAccessRole(profileUserRole);
  if (roleFromProfile) {
    return roleFromProfile;
  }

  if (user?.plan === 'premium') {
    return 'premium_user';
  }

  return 'free_user';
}

export function getDashboardBasePath(accessRole: AccessRole): string {
  return accessRole === 'trial_user' ? '/test/dashboard' : '/dashboard';
}

export function getDashboardPathForRole(input: AccessRoleInput, subPath = ''): string {
  const normalizedSubPath = subPath ? (subPath.startsWith('/') ? subPath : `/${subPath}`) : '';
  return `${getDashboardBasePath(getAccessRole(input))}${normalizedSubPath}`;
}

export function mapDashboardPath(pathname: string, targetRole: AccessRole): string {
  const isLegacyTrialPath = pathname.startsWith('/usuariostest/dashboard');
  const isTrialPath = pathname.startsWith('/test/dashboard') || isLegacyTrialPath;
  const currentBase = isTrialPath
    ? isLegacyTrialPath
      ? '/usuariostest/dashboard'
      : '/test/dashboard'
    : '/dashboard';

  const targetBase = getDashboardBasePath(targetRole);
  const suffix = pathname.slice(currentBase.length);

  return `${targetBase}${suffix}` || targetBase;
}
