# web app

The web client is coded by react.

## Script File Name Policy

Offen use lower carmel case like `apiScripts.ts` or `someRoutePage.tsx`

For react components under the folder `src/components`, offen use upper carmel case like `AnyComponent.tsx`

And because the route framework used [TanStackRouter](https://tanstack.com/router/latest/docs/framework/react/overview), the files under `src/routes` need follow some rules. Please see [File-Based Routing](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing).

## Hooks

### [`useAuth`](./src/hooks/useAuth.ts)

The `useAuth` will return `boolean` to show if current user can access by user permissions or role.

#### `useAuth` Props

|name|type|default|description|
|-|-|-|-|
|`location`|`boolean`|`false`|Verify location pathname.|
|`permissions`|`string[]`|`-`|If set, user need have any of `permissions`|
|`allPermissions`|`boolean`|`false`|If set, user need have all of `permissions`|
|`roles`|`string[]`|`-`|If set, user need have one of the `roles`|

## Components

### Authorized Route

If need protecet the route by role, permission or accessible, can use `RouteGuard` component.

This is an simple example below:

```tsx
import { RouteGuard } from "@/components/RouteGuard";

function RouteComponent() {
  return (
    <RouteGuard location redirectTo="/unauthorized">
      <RouteContent />
    </RouteGuard>
  );
}

function RouteContent() {
  return ...;
}
```

#### RouteGuard Props

`RouteGuard` depend to the `useAuth` hook in [useAuth.ts](./src/hooks/useAuth.ts).

|name|type|default|description|
|-|-|-|-|
|`location`|`boolean`|`false`|Verify location pathname.|
|`permissions`|`string[]`|`-`|If set, user need have any of `permissions`|
|`allPermissions`|`boolean`|`false`|If set, user need have all of `permissions`|
|`roles`|`string[]`|`-`|If set, user need have one of the `roles`|
|`redirectTo`|`string`|`-`|If can't enter page, will auto redirect to the target path|
|`loginTo`|`string`|`/login`|If user not login, will auto redirect to the login path. This can be set `undefined` to prevent redirect to login page.|
|`placeholder`|`React.ReactNode`|`-`|If not set `redirectTo` and `loginTo` is `undefined`, will display this placeholder content.|
