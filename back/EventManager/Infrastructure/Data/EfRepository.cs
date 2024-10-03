namespace Infrastructure.Data
{
    public class EfRepository<T> : RepositoryBase<T> where T : class
    {
        protected readonly ApplicationDbContext _context;
        public EfRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
