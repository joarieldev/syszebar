import {
  DragDropProvider,
  DragDropSensors,
  SortableProvider,
  createSortable,
  createDroppable,
  closestCenter,
  transformStyle,
  type CollisionDetector,
  type DragEventHandler,
  type Draggable,
  type Droppable,
  type Id,
} from "@thisbeyond/solid-dnd";
import { batch, For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { module, saveToggleModule } from "../../util/modules";
import {
  moduleContainers,
  setModuleContainers,
  saveModuleContainers,
  type ColumnId,
  type ContainerMap,
} from "../../util/module-containers";
import { GripVertical } from "../../icons/grip-vertical";
import type { ModuleId, ModuleIdWithIcon } from "../../util/modules";
import {
  moduleColors,
  saveModuleColor,
  resetModuleColor,
  MODULES_WITH_ICON,
} from "../../util/module-colors";
import { Rotate } from "../../icons/rotate";

interface SortableProps {
  item: string;
}

const Sortable = (props: SortableProps) => {
  const sortable = createSortable(props.item);
  return (
    <div
      ref={sortable.ref}
      class="flex justify-between bg-line/40 p-1 rounded"
      classList={{ "opacity-25": sortable.isActiveDraggable }}
      style={transformStyle(sortable.transform)}
    >
      <div class="flex justify-center items-center gap-1">
        <div class="cursor-grab" {...sortable.dragActivators}>
          <GripVertical class="size-3" />
        </div>
        <span>{props.item}</span>
      </div>
      <div class="flex justify-center items-center gap-2">
        <Show when={MODULES_WITH_ICON.hasOwnProperty(props.item as ModuleIdWithIcon)}>
          <div class="flex items-center">
            <input
              type="color"
              value={moduleColors[props.item as ModuleIdWithIcon] || "#ffffff"}
              onInput={(e) =>
                saveModuleColor(props.item as ModuleIdWithIcon, e.currentTarget.value)
              }
              title="Icon color"
              class="size-5 p-0 border-none cursor-pointer bg-transparent"
            />
            <button
              onClick={() => resetModuleColor(props.item as ModuleIdWithIcon)}
              title="Reset"
              class="text-muted hover:text-content cursor-pointer"
            >
              <Rotate class="size-3" />
            </button>
          </div>
        </Show>
        <input
          title="Hidden"
          type="checkbox"
          checked={module[props.item as ModuleId]}
          onChange={() => saveToggleModule(props.item as ModuleId)}
          class="accent-line size-3.5 cursor-pointer"
        />
      </div>
    </div>
  );
};

interface ColumnProps {
  id: ColumnId;
  items: string[];
}

const Column = (props: ColumnProps) => {
  const droppable = createDroppable(props.id);
  return (
    <div ref={droppable.ref}>
      <span class="block pt-1 font-semibold text-muted text-start text-[10px] uppercase">
        {props.id}
      </span>
      <div class="space-y-1 text-xs">
        <SortableProvider ids={props.items}>
          <For each={props.items}>{(item) => <Sortable item={item} />}</For>
        </SortableProvider>
      </div>
    </div>
  );
};

export function Modules() {
  const [containers, setContainers] = createStore<ContainerMap>({
    left: [...moduleContainers.left],
    center: [...moduleContainers.center],
    right: [...moduleContainers.right],
  });

  const containerIds = (): ColumnId[] => Object.keys(containers) as ColumnId[];

  const isContainer = (id: Id): boolean =>
    containerIds().includes(id as ColumnId);

  const getContainer = (id: Id): ColumnId | undefined => {
    for (const [key, items] of Object.entries(containers)) {
      if (items.includes(id as string)) {
        return key as ColumnId;
      }
    }
  };

  const closestContainerOrItem: CollisionDetector = (
    draggable,
    droppables,
    context,
  ) => {
    const closestContainer = closestCenter(
      draggable,
      droppables.filter((droppable) => isContainer(droppable.id)),
      context,
    );
    if (closestContainer) {
      const containerItemIds = containers[closestContainer.id as ColumnId];
      const closestItem = closestCenter(
        draggable,
        droppables.filter((droppable) =>
          containerItemIds.includes(droppable.id as string),
        ),
        context,
      );
      if (!closestItem) {
        return closestContainer;
      }

      if (getContainer(draggable.id) !== closestContainer.id) {
        const isLastItem =
          containerItemIds.indexOf(closestItem.id as string) ===
          containerItemIds.length - 1;

        if (isLastItem) {
          const belowLastItem =
            draggable.transformed.center.y > closestItem.transformed.center.y;

          if (belowLastItem) {
            return closestContainer;
          }
        }
      }
      return closestItem;
    }
    return null;
  };

  const move = (
    draggable: Draggable,
    droppable: Droppable,
    onlyWhenChangingContainer = true,
  ) => {
    const draggableContainer = getContainer(draggable.id);
    const droppableContainer = isContainer(droppable.id)
      ? (droppable.id as ColumnId)
      : getContainer(droppable.id);

    if (
      draggableContainer != droppableContainer ||
      !onlyWhenChangingContainer
    ) {
      const containerItemIds = containers[droppableContainer!];
      let index = containerItemIds.indexOf(droppable.id as string);
      if (index === -1) index = containerItemIds.length;

      batch(() => {
        setContainers(draggableContainer!, (items) =>
          items.filter((item) => item !== draggable.id),
        );
        setContainers(droppableContainer!, (items) => [
          ...items.slice(0, index),
          draggable.id as string,
          ...items.slice(index),
        ]);
      });
    }
  };

  const onDragOver: DragEventHandler = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      move(draggable, droppable);
    }
  };

  const onDragEnd: DragEventHandler = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      move(draggable, droppable, false);
      setModuleContainers({
        left: [...containers.left],
        center: [...containers.center],
        right: [...containers.right],
      });
      saveModuleContainers({
        left: [...containers.left],
        center: [...containers.center],
        right: [...containers.right],
      });
    }
  };

  return (
    <div class="flex flex-col flex-1 self-stretch overflow-hidden">
      <DragDropProvider
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        collisionDetector={closestContainerOrItem}
      >
        <DragDropSensors />
        <div class="columns flex flex-col gap-2">
          <For each={containerIds()}>
            {(key) => <Column id={key} items={containers[key]} />}
          </For>
        </div>
      </DragDropProvider>
    </div>
  );
}
