using System.Linq.Expressions;
using System.Reflection;

namespace Less.EntityFramework.Plus
{
    internal class ClosureResolver : ExpressionVisitor
    {
        protected override Expression VisitMember(MemberExpression node)
        {
            if (node.Expression is ConstantExpression constantExpr &&
                constantExpr.Value != null)
            {
                // 从闭包类实例获取字段值
                var container = constantExpr.Value;
                var fieldValue = (node.Member as FieldInfo)?.GetValue(container);
                if (fieldValue != null)
                {
                    return Expression.Constant(fieldValue); // 替换为实际值
                }
            }
            return base.VisitMember(node);
        }
    }
}
