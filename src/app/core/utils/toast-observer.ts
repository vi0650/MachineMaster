import { Observable, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { HotToastService } from '@ngxpert/hot-toast';

export function hotToastObserve<T>(
  toast: HotToastService,
  options: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((err: any) => string);
  }
) {
  const loadingToast = toast.loading(options.loading);

  return (source: Observable<T>) =>
    source.pipe(
      tap((res) => {
        const message =
          typeof options.success === 'function'
            ? options.success(res)
            : options.success;

        toast.success(message);
      }),

      catchError((err) => {
        const errorMsg =
          typeof options.error === 'function'
            ? options.error(err)
            : options.error;

        toast.error(errorMsg);
        return of(null as T);
      }),

      finalize(() => {
        toast.close();
      })
    );
}
