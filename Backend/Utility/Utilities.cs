namespace Backend.Utility
{
    public class Utilities
    {
        public static string GetExceptionMessage(Exception ex)
        {
            var exceptionMessage = ex.Message;

            while (ex.InnerException != null)
            {
                ex = ex.InnerException;
                exceptionMessage += " ; " + ex.Message;
            }

            return exceptionMessage;
        }

        public static string GetBlobFolderFromEmail(string email)
        {
            return email.Replace("@", "_at_").Replace(".", "_dot_");
        }
    }
}
