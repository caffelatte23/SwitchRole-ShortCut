import { BackIcon } from '@/components/icons';
import * as Chrome from '@/lib/chrome';
import {
  FieldError,
  RegisterOptions,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Role } from './menu';

const EditMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = (location?.state?.role as Role) ?? null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Role>({
    defaultValues: {
      account: role?.account ?? '',
      roleName: role?.roleName ?? '',
      displayName: role?.displayName ?? '',
    },
  });

  const rules: { [key in keyof Role]: RegisterOptions<Role, keyof Role> } = {
    account: {
      minLength: { value: 12, message: 'アカウントは12桁で入力してください' },
      maxLength: { value: 12, message: 'アカウントは12桁で入力してください' },
      required: '入力は必須です',
    },
    roleName: { required: '入力は必須です' },
    displayName: {
      minLength: { value: 1, message: '1 ~ 20字で入力してください' },
      maxLength: { value: 20, message: '1 ~ 20字で入力してください' },
      required: '入力は必須です',
    },
  };

  const onSubmit = handleSubmit(
    async (data) => {
      const items: Role[] = (await Chrome.storage.get()) as Role[];
      const isEdit = Boolean(role !== null);

      const newItems = [...items];
      const target = items.findIndex((d) => d.account === data.account);
      if (isEdit) {
        newItems[target] = data;
      } else {
        if (target !== -1)
          throw new Error('your input account already registered');
        newItems.push(data);
      }

      Chrome.storage.set(newItems).then(() => navigate('/'));
    },
    () => {}
  );

  return (
    <div className="box-border flex h-full w-[350px] flex-col gap-4 rounded p-4">
      <div className="flex justify-between">
        <Link to={'/'}>
          <BackIcon className="h-6 w-6 rounded-full p-1 hover:bg-slate-300" />
        </Link>
        <input type="submit" value={'Save'} onClick={onSubmit} />
      </div>
      <form onSubmit={onSubmit} className="flex min-h-[300px] flex-col gap-4">
        <FormItem
          prop="account"
          register={register}
          rule={rules.account}
          disabled={Boolean(role !== null)}
          error={errors.account}
        />
        <FormItem
          prop="roleName"
          rule={rules.roleName}
          register={register}
          error={errors.roleName}
        />
        <FormItem
          prop="displayName"
          rule={rules.displayName}
          register={register}
          error={errors.displayName}
        />
      </form>
    </div>
  );
};

const FormItem: React.FC<{
  prop: keyof Role;
  disabled?: boolean;
  rule?: RegisterOptions<Role, keyof Role>;
  register: UseFormRegister<Role>;
  error: FieldError | undefined;
}> = ({ prop, register, rule = {}, disabled = false, error }) => {
  const id = `form-item-${prop}`;
  return (
    <div>
      <label
        className="mb-1 block font-bold  tracking-wide text-gray-700"
        htmlFor={id}
      >
        {prop}
      </label>
      <input
        id={id}
        disabled={disabled}
        className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
        {...register(prop, rule)}
      />
      {error && <span className="text-red-400">{error.message}</span>}
    </div>
  );
};

export default EditMenu;
