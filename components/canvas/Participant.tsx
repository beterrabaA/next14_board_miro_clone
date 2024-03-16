"use client";

import { useOthers, useSelf } from "@/liveblocks.config";

import { connectionIdToColor } from "@/lib/utils";

import { UserAvatar } from "@/components/canvas/UserAvatar";

const MAX_SHOWN_USERS = 2;

export const Participant = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;
  return (
    <div className="absolute top-2 right-2 bg-white rounded-md p-3 h-12 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              key={connectionId}
              borderColor={connectionIdToColor(connectionId)}
              fallback={info?.name?.[0] || "A"}
              name={info?.name}
              src={info?.picture}
            />
          );
        })}

        {currentUser && (
          <UserAvatar
            borderColor={connectionIdToColor(currentUser.connectionId)}
            fallback={currentUser?.info?.name?.[0] || "A"}
            name={`${currentUser?.info?.name} (You)`}
            src={currentUser?.info?.picture}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  );
};
