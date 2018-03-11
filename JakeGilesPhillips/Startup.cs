using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(JakeGilesPhillips.Startup))]
namespace JakeGilesPhillips
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
