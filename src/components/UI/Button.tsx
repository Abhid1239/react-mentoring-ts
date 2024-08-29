import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom';

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
    textOnly?: boolean;
    children: ReactNode
}

type LinkButtonProps = LinkProps & {
    children: ReactNode;
    textOnly?: boolean;
    to: string;


}

type Props = LinkButtonProps | ButtonProps;

function isLinkButtonProps(props: Props): props is LinkButtonProps {

    return 'to' in props;
}

export default function Button(props: Props) {

    if (isLinkButtonProps(props)) {
        const { children, textOnly, ...otherProps } = props;

        return (
            <Link className={`button ${textOnly ? 'button--text-only' : ''}`} {...otherProps}>
                {children}
            </Link>
        )
    }
    const { children, textOnly, ...otherProps } = props;

    return (
        <button className={`button ${textOnly ? 'button--text-only' : ''}`} {...otherProps}>{children}</button>
    )
}