export type Credentials = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
};

export type CreateUserData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  tenantId: number;
};
export type Tenants = {
  id: number;
  name: string;
  address: string;
};

export type FieldData = {
  name: string;
  value?: string;
};

export type CreateTenantData = {
  name: string[];
  address: string;
};
