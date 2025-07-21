using Microsoft.EntityFrameworkCore;
using System;

namespace Less.DalCore.EntityConfiguration
{
    public class EntityConfigurationHolder
    {
        public EntityConfigurationHolder(Type dbContextType, Action<ModelBuilder> action, int priority)
        {
            DbContextType = dbContextType;
            Action = action;
            Priority = priority;
        }

        public Type DbContextType { get; }
        public Action<ModelBuilder> Action { get; }
        public int Priority { get; }
    }
}
