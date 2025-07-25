using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace Less.Auth.FeatResources
{
    internal class DefaultFeatResourceClaimParser : IFeatResourceClaimParser
    {
        private const string CLAIMTYPE_PREFIX = "t=";
        private const string CLAIMVALUE_PREFIX = "v=";
        private const char CLAIM_TV_SPLIT = ',';
        private const char CLAIM_SPLIT = ';';
        private const char CLAIM_SPLIT_ALT = '_';
        private static readonly Regex _tvMatch = new Regex("t=(?<t>.*)[|]v=(?<v>.*)", RegexOptions.Compiled);

        private static string ReplaceAlt(string value)
        {
            return value.Replace(CLAIM_SPLIT, CLAIM_SPLIT_ALT).Replace(CLAIM_TV_SPLIT, CLAIM_SPLIT_ALT);
        }

        public string ClaimsToString(IList<Claim> claims)
        {
            var values = claims.Where(c => c != null).Select(c =>
            {
                StringBuilder strBuilder = new StringBuilder();
                strBuilder.Append(CLAIMTYPE_PREFIX);
                strBuilder.Append(ReplaceAlt(c.Type));
                strBuilder.Append(CLAIM_TV_SPLIT);
                strBuilder.Append(CLAIMVALUE_PREFIX);
                strBuilder.Append(ReplaceAlt(c.Value));
                return strBuilder.ToString();
            });
            return string.Join($"{CLAIM_SPLIT}", values);
        }

        public IList<Claim> StringToClaims(string? value)
        {
            if (string.IsNullOrEmpty(value)) return new List<Claim>();

            var values = value!.Split(CLAIM_SPLIT);
            var claims = new List<Claim>();
            foreach (var tv in values)
            {
                var match = _tvMatch.Match(tv);
                if (!match.Success)
                {
                    return claims;
                }

                var matchType = match.Groups["t"].Value;
                var matchValue = match.Groups["v"].Value;

                claims.Add(new Claim(matchType, matchValue));
            }

            return claims;
        }
    }
}
