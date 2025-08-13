using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;

namespace Less.Auth.Dal
{
    public sealed class UUIDToDatabaseConverter : ValueConverter<UUID, string>
    {
        private static readonly ConverterMappingHints defaultHints = new ConverterMappingHints(32);

        public UUIDToDatabaseConverter()
            : this(null)
        {
        }

        public UUIDToDatabaseConverter(ConverterMappingHints? mappingHints = null)
            : base(uuid => uuid.ToString(), str => UUID.Parse(str), defaultHints.With(mappingHints))
        {
        }
    }
}
