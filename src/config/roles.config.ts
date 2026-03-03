import { RoleType } from '@app/auth/entities/roles.entity';
export const rolesConfig = [
  {
    name: RoleType.client,
    description: 'role del usuario regular, que tiene acceso limitado a los servicios',
  },
  {
    name: RoleType.admin,
    description: 'role del equipo de trabajo de la plataforma',
  },
  {
    name: RoleType.professional,
    description:
      'role del usuario que pago suscripcion para usar todos los servicios de la plataforma',
  },
];
